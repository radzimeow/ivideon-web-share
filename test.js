
        function openModal(id) {
            document.getElementById(id).classList.add('open');
            // Close any open dropdowns
            const menus = document.querySelectorAll('.dropdown-menu');
            menus.forEach(menu => menu.classList.remove('show'));
        }

        function closeModal(id) {
            if(id) {
                document.getElementById(id).classList.remove('open');
            } else {
                document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
            }
        }

        const cameraStates = {
            cam1: false,
            cam2: false,
            cam3: false
        };
        
        const cameraConfig = {
            cam1: { sound: false, archive: false, link: false, linkUrl: '', linkText: '' },
            cam2: { sound: false, archive: false, link: false, linkUrl: '', linkText: '' },
            cam3: { sound: false, archive: false, link: false, linkUrl: '', linkText: '' }
        };
        
        let currentCameraId = null;

        function loadSettingsToUI(suffix) {
            const cfg = cameraConfig[currentCameraId];
            if(!cfg) return;
            
            document.getElementById('setting-sound-' + suffix).checked = cfg.sound;
            document.getElementById('setting-archive-' + suffix).checked = cfg.archive;
            
            const linkCb = document.getElementById('setting-link-' + suffix);
            linkCb.checked = cfg.link;
            
            const linkBox = suffix === 1 ? 'linkBox' : 'activeLinkBox';
            document.getElementById(linkBox).style.display = cfg.link ? 'block' : 'none';
            
            document.getElementById('setting-link-url-' + suffix).value = cfg.linkUrl;
            document.getElementById('setting-link-text-' + suffix).value = cfg.linkText;
        }

        function saveSettingsFromUI(suffix) {
            const cfg = cameraConfig[currentCameraId];
            if(!cfg) return;
            
            cfg.sound = document.getElementById('setting-sound-' + suffix).checked;
            cfg.archive = document.getElementById('setting-archive-' + suffix).checked;
            cfg.link = document.getElementById('setting-link-' + suffix).checked;
            cfg.linkUrl = document.getElementById('setting-link-url-' + suffix).value;
            cfg.linkText = document.getElementById('setting-link-text-' + suffix).value;
        }

        function applyActiveSettings() {
            saveSettingsFromUI(2);
            document.getElementById('applyActiveBtn').disabled = true;
        }

        function openPublicSettingsDirectly(event, id, name) {
            if (event) {
                event.stopPropagation();
            }
            
            // Set current camera
            currentCameraId = id;
            isPublicAccessOpen = cameraStates[id];
            
            // Update names in modals
            const n1 = document.getElementById('dynamicCamName1');
            const n2 = document.getElementById('dynamicCamName2');
            const n3 = document.getElementById('dynamicCamName3');
            const n4 = document.getElementById('dynamicCamName4');
            
            if(n1) n1.innerText = name;
            if(n2) n2.innerText = name;
            if(n3) n3.innerText = name;
            if(n4) n4.innerText = name;

            if (isPublicAccessOpen) {
                resetPublicActiveTabs();
                loadSettingsToUI(2);
                openModal('publicActiveModal');
            }
        }

                function openOldAccessModal() {
            closeModal('forkModal');
            openModal('accessModal');
        }
        function openNewAccessModal() {
            closeModal('forkModal');
            let nNew = document.getElementById('dynamicCamName1New');
            let nOld = document.getElementById('dynamicCamName1');
            if(nNew && nOld) nNew.textContent = nOld.textContent;
            openModal('accessModalNew');
        }
        function openAccessModal(id, name) {
            currentCameraId = id;
            isPublicAccessOpen = cameraStates[id];
            
            const n1 = document.getElementById('dynamicCamName1');
            const n2 = document.getElementById('dynamicCamName2');
            const n3 = document.getElementById('dynamicCamName3');
            const n4 = document.getElementById('dynamicCamName4');
            
            if(n1) n1.innerText = name;
            if(n2) n2.innerText = name;
            if(n3) n3.innerText = name;
            if(n4) n4.innerText = name;

            updatePublicAccessStatusUI();
            openModal('accessModal');
        }

        function resetPublicActiveTabs() {
            const modal = document.getElementById('publicActiveModal');
            if (!modal) return;
            const tabs = modal.querySelectorAll('.modal-tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            if(tabs.length > 0) tabs[0].classList.add('active');
            
            const contents = modal.querySelectorAll('.modal-tab-content');
            contents.forEach(content => content.classList.remove('active'));
            const firstContent = document.getElementById('active-tab-link');
            if(firstContent) firstContent.classList.add('active');
        }
        function handlePublicAccessClick() {
            let isNewModal = document.getElementById('accessModalNew').classList.contains('open');
            if (cameraStates[currentCameraId]) {
                if (isNewModal) {
                    document.getElementById('accessModalNewMainView').style.display = 'none';
                    document.getElementById('accessModalNewSettingsView').style.display = 'flex';
                } else {
                    closeModal('accessModal');
                    resetPublicActiveTabs();
                    loadSettingsToUI(2);
                    openModal('publicActiveModal');
                }
            } else {
                openModal('publicWarningModal');
            }
        }

        function goBackToMainView() {
            document.getElementById('accessModalNewSettingsView').style.display = 'none';
            document.getElementById('accessModalNewMainView').style.display = 'block';
        }

        function goBackToAccessModal() {
            closeModal('publicActiveModal');
            openModal('accessModal');
        }

        function goToPublicSettings() {
            closeModal('publicWarningModal');
            loadSettingsToUI(1);
            openModal('publicSettingsModal');
        }

        function goToPublicOffer() {
            saveSettingsFromUI(1);
            closeModal('publicSettingsModal');
            openModal('publicOfferModal');
            // reset checkbox
            document.getElementById('offerCheckbox').checked = false;
            document.getElementById('publishBtn').disabled = true;
        }

        function goBackToPublicSettings() {
            closeModal('publicOfferModal');
            openModal('publicSettingsModal');
        }

        function enableApplyButton() {
            const btn = document.getElementById('applyActiveBtn');
            if(btn) btn.disabled = false;
        }
        function updatePublicAccessStatusUI() {
            const statusBlock = document.getElementById("publicAccessStatus");
            const statusBlockNew = document.getElementById("publicAccessStatusNew");
            const openHTML = "<span>Доступ открыт</span><i class="fas fa-chevron-right" style="margin-left: auto; color: #A5AAB2;"></i>";
            const closedHTML = "<span>Доступ закрыт</span><i class="fas fa-chevron-right" style="margin-left: auto; color: #A5AAB2;"></i>";
            
            const iconNew = document.querySelector("#accessModalNew .public-icon");
            const titleNew = document.querySelector("#accessModalNew .public-title");
            const iconOld = document.querySelector("#accessModal .public-icon");
            const titleOld = document.querySelector("#accessModal .public-title");

            if (cameraStates[currentCameraId]) {
                if (statusBlock) {
                    statusBlock.innerHTML = openHTML;
                    statusBlock.style.color = "#1ba0fa";
                }
                if (statusBlockNew) {
                    statusBlockNew.innerHTML = openHTML;
                    statusBlockNew.style.color = "#1ba0fa";
                }
                if(iconNew) iconNew.style.color = "#1ba0fa";
                if(titleNew) titleNew.style.color = "#1ba0fa";
                if(iconOld) iconOld.style.color = "#1ba0fa";
                if(titleOld) titleOld.style.color = "#1ba0fa";
            } else {
                if (statusBlock) {
                    statusBlock.innerHTML = closedHTML;
                    statusBlock.style.color = "#828894";
                }
                if (statusBlockNew) {
                    statusBlockNew.innerHTML = closedHTML;
                    statusBlockNew.style.color = "#828894";
                }
                if(iconNew) iconNew.style.color = "#A5AAB2";
                if(titleNew) titleNew.style.color = "#31363F";
                if(iconOld) iconOld.style.color = "#A5AAB2";
                if(titleOld) titleOld.style.color = "#31363F";
            }
        }

        function publishCamera() {
            cameraStates[currentCameraId] = true;
            isPublicAccessOpen = true;
            closeModal("publicOfferModal");
            
            let isNewModal = document.getElementById("accessModalNew").classList.contains("open");
            if (!isNewModal) {
                closeModal("accessModal");
                const btn = document.getElementById("applyActiveBtn");
                if(btn) btn.disabled = true;
                resetPublicActiveTabs();
                loadSettingsToUI(2);
                openModal("publicActiveModal");
            }
            
            const shareBadge = document.getElementById("badge-" + currentCameraId);
            if (shareBadge) {
                shareBadge.style.display = "flex";
            }
            updatePublicAccessStatusUI();
        }

        function openCloseAccessModal() {
            closeModal('publicActiveModal');
            openModal('closeAccessModal');
        }

        function cancelCloseAccess() {
            closeModal('closeAccessModal');
            openModal('publicActiveModal');
        }

        function confirmCloseAccess() {
            cameraStates[currentCameraId] = false;
            isPublicAccessOpen = false;
            closeModal('closeAccessModal');
            const shareBadge = document.getElementById('badge-' + currentCameraId);
            if (shareBadge) {
                shareBadge.style.display = 'none';
            }
            updatePublicAccessStatusUI();
            openModal('accessModal');
        }

        function switchActiveTab(tabElement, tabId) {
            const tabs = document.getElementById('publicActiveModal').querySelectorAll('.modal-tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            tabElement.classList.add('active');
            
            const contents = document.getElementById('publicActiveModal').querySelectorAll('.modal-tab-content');
            contents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        }

        function toggleAccordion(header) {
            const section = header.parentElement;
            const body = section.querySelector('.accordion-body');
            if (section.classList.contains('open')) {
                section.classList.remove('open');
                body.style.display = 'none';
            } else {
                section.classList.add('open');
                body.style.display = 'block';
            }
        }

        function switchModalTab(tabElement, tabId) {
            // Remove active class from all tabs in accessModal
            const modal = document.getElementById('accessModal');
            const tabs = modal.querySelectorAll('.modal-tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            tabElement.classList.add('active');
            
            // Hide all tab contents in accessModal
            const contents = modal.querySelectorAll('.modal-tab-content');
            contents.forEach(content => content.classList.remove('active'));
            
            // Show target tab content
            document.getElementById(tabId).classList.add('active');
        }

        function toggleMenu(event, menuId) {
            event.stopPropagation();
            
            // Close all other menus
            const menus = document.querySelectorAll('.dropdown-menu');
            menus.forEach(menu => {
                if(menu.id !== menuId) {
                    menu.classList.remove('show');
                }
            });
            
            // Toggle clicked menu
            const menu = document.getElementById(menuId);
            menu.classList.toggle('show');
        }

        // Close menu/modal when clicking outside
        window.onclick = function(event) {
            if (!event.target.matches('.menu-trigger') && !event.target.closest('.menu-trigger')) {
                const menus = document.querySelectorAll('.dropdown-menu');
                menus.forEach(menu => {
                    menu.classList.remove('show');
                });
            }
            
            // Close modal if clicked on overlay
            if (event.target.classList.contains('modal-overlay')) {
                event.target.classList.remove('open');
            }
        }
        function openFilterModal() {
            openModal('filterModal');
        }
        function applyFilters() {
            let checkboxes = document.querySelectorAll('.access-type-filter');
            let selectedTypes = [];
            checkboxes.forEach(cb => {
                if(cb.checked) selectedTypes.push(cb.value.toLowerCase());
            });
            
            let userItems = document.querySelectorAll('#accessModalNew .user-item');
            userItems.forEach(item => {
                if(selectedTypes.length === 0) {
                    item.style.display = 'flex';
                } else {
                    let text = item.innerText.toLowerCase();
                    if(selectedTypes.some(type => text.includes(type))) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
            closeModal('filterModal');
        }
        function resetCurrentFilter() {
            document.querySelectorAll('.access-type-filter').forEach(cb => cb.checked = false);
        }
        function resetAllFilters() {
            resetCurrentFilter();
            applyFilters();
        }
    